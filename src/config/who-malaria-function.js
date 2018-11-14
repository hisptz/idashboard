//Example of function implementation
parameters.progress(0);
//get expression and expresiion map form rule
var expressionMapping = parameters.rule.json.expressionMapping;
var namesMapping = parameters.rule.json.namesMapping
var expression = parameters.rule.json.expression;
//get perameter for actual and reference periods
var peSelection = parameters.peSelection;
var useReferencePeriod = parameters.useReferencePeriod
if (useReferencePeriod) {
  console.log({
    useReferencePeriod,
    peSelection,
    name: parameters.rule.name
  })
}

// get all uids form expression
var dataElements = getUidsFromExpression(expression);
//checking for all de uids has mapper
var mappingStatus = getDataElementMappingStatus(dataElements, expressionMapping);
//@todo remove skip logic in case result of mapping is false
if (mappingStatus.areAllMapped) {
  //get analytics results
  var dx = dataElements.join(";");
  loadingAndEvaluateAnalyticsData(dx, expression, dataElements);
} else {
  // return error message with unmapped de
  var errorMessage = getMissingDataElementsMappingErrorMessage(mappingStatus.dataElementWithoutMapping, namesMapping)
  parameters.error(errorMessage);
}

function loadingAndEvaluateAnalyticsData(dx, expression, dataElements) {
  $.ajax({
    url: "../../../api/analytics.json?dimension=dx:" + dx + "&dimension=pe:" + parameters.pe + "&dimension=ou:" + parameters.ou,
    type: "GET",
    success: function (analyticsResults) {
      //evaluate expression and and get new analytic object

      parameters.success(getSanitizedAnalytict(analyticsResults, parameters));
    },
    error: function (error) {
      parameters.error(error);
    }
  })
}

function getDataElementMappingStatus(dataElements, expressionMapping) {
  var areAllMapped = true;
  var dataElementWithoutMapping = []
  dataElements.forEach(function (dataElement) {
    var hasBeenMapped = false;
    Object.keys(expressionMapping).forEach(function (key) {
      if (expressionMapping[key] === dataElement) {
        hasBeenMapped = true;
      }
    })
    if (!hasBeenMapped) {
      dataElementWithoutMapping = dataElementWithoutMapping.concat(dataElement);
      areAllMapped = false;
    }
  });
  return {
    areAllMapped,
    dataElementWithoutMapping
  };
}

function getUidsFromExpression(expression) {
  var uids = [];
  var matchRegrex = /(\{.*?\})/gi;
  expression.match(matchRegrex).forEach(function (value) {
    uids = uids.concat(value.replace("{", ':separator:').replace("}", ':separator:').split(':separator:').filter(content => content.length > 0));
  });
  return uids;
}

function getMissingDataElementsMappingErrorMessage(dataElementsIds, namesMapping) {
  var errorMessage = {
    "httpStatus": "Conflict",
    "httpStatusCode": 409,
    "status": "ERROR",
    "message": ""
  };
  var missingDataElementNames = [];
  dataElementsIds.forEach(function (id) {
    if (namesMapping[id]) {
      missingDataElementNames.push(namesMapping[id])
    } else {
      missingDataElementNames.push(id)
    }
  })
  errorMessage.message += missingDataElementNames.join(",") + " have not been mapped";
  return errorMessage;
}

function getSanitizedAnalytict(analyticsResults, parameters) {
  var analytics = {
    "headers": [{
      "name": "dx",
      "column": "Data",
      "valueType": "TEXT",
      "type": "java.lang.String",
      "hidden": false,
      "meta": true
    }, {
      "name": "pe",
      "column": "Period",
      "valueType": "TEXT",
      "type": "java.lang.String",
      "hidden": false,
      "meta": true
    }, {
      "name": "ou",
      "column": "Organisation unit",
      "valueType": "TEXT",
      "type": "java.lang.String",
      "hidden": false,
      "meta": true
    }, {
      "name": "value",
      "column": "Value",
      "valueType": "NUMBER",
      "type": "java.lang.Double",
      "hidden": false,
      "meta": false
    }],
    "metaData": {
      "items": {
        "dx": {
          "name": "Data"
        },
        "pe": {
          "name": "Period"
        },
        "ou": {
          "name": "Organisation unit"
        }
      },
      "dimensions": {
        "dx": [],
        "pe": [],
        "ou": [],
        "co": []
      }
    },
    "rows": [],
    "width": 4,
    "height": 0
  };
  var ous = [];
  var periods = [];
  if (analyticsResults && analyticsResults.metaData && analyticsResults.metaData.dimensions) {
    periods = periods.concat(analyticsResults.metaData.dimensions.pe);
    ous = ous.concat(analyticsResults.metaData.dimensions.ou);
    periods.forEach(function (pe) {
      analytics.metaData.items[pe] = analyticsResults.metaData.items[pe];
    });
    ous.forEach(function (ou) {
      analytics.metaData.items[ou] = analyticsResults.metaData.items[ou];
    });

  } else if (analyticsResults && analyticsResults.metaData && analyticsResults.metaData.pe) {
    periods = periods.concat(analyticsResults.metaData.pe);
    ous = ous.concat(analyticsResults.metaData.ou);
    if (analyticsResults.metaData.names) {
      periods.forEach(function (pe) {
        analytics.metaData.items[pe] = {
          "name": analyticsResults.metaData.names[pe]
        };
      });
      ous.forEach(function (ou) {
        analytics.metaData.items[ou] = {
          "name": analyticsResults.metaData.names[ou]
        };
      });
    }
  }

  var rule = parameters.rule;
  analytics.metaData.items[rule.id] = {
    "name": rule.name
  };
  analytics.metaData.dimensions.dx = analytics.metaData.dimensions.dx.concat(rule.id)
  analytics.metaData.dimensions.pe = analytics.metaData.dimensions.pe.concat(periods)
  analytics.metaData.dimensions.ou = analytics.metaData.dimensions.ou.concat(ous);

  if (ous.length > 0 && periods.length > 0) {
    // get key value pair
    ous.forEach(function (ou) {
      periods.forEach(function (pe) {
        var keyValuePair = getDataElementValuePair(ou, pe, analyticsResults.rows);
        //get evaulated values of rule
        var evaluatedValue = getEvaluatedValueOfRule(rule.json.expression, keyValuePair);
        //adding values on row
        analytics.rows.push([rule.id, pe, ou, evaluatedValue]);
      })
    })
  }
  analytics.height = analytics.rows.length;
  return analytics;
}

function getDataElementValuePair(ou, pe, rows) {
  var keyValuePair = {};
  rows.forEach(function (row) {
    var key = row[0];
    if (!keyValuePair[key]) {
      keyValuePair[key] = 0;
    }
    if (row.length === 4) {
      var rowPe = row[1];
      var rowOu = row[2];
      var value = row[3];
      if (rowPe === pe && rowOu === ou) {
        var oldValue = parseInt(keyValuePair[key], 10);
        var newValue = oldValue + parseInt(value, 10);
        keyValuePair[key] = newValue.toFixed(1);
      }
    }
  });
  return keyValuePair;
}

function getEvaluatedValueOfRule(expression, keyValuePair) {
  var evaluatedValue = 0;
  var formulaPattern = /#\{.+?\}/g;
  var matcher = expression.match(formulaPattern);
  matcher.forEach(function (match) {
    var operand = match.replace(/[#\{\}]/g, '');
    if (keyValuePair[operand]) {
      expression = expression.replace(match, parseInt(keyValuePair[operand], 10));
    }
    try {
      if (!isNaN(eval(expression))) {
        evaluatedValue = eval(expression);
      }
    } catch (e) {

    }
  });
  return evaluatedValue.toFixed(1);
}
