import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/internal/observable/interval';
import {AppState} from '../../../../store/app.reducers';
import {Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../../../store/current-user/current-user.selectors';
import {CurrentUserState} from '../../../../store/current-user/current-user.state';
import {getAnalyticsData, getGroupedSlidersInfo, getStatsSummary} from '../../../../store/portal/portal.selectors';
import * as portalActions from '../../../../store/portal/portal.actions';
import {DataState, GroupedSlidersState, StatsSummaryState} from '../../../../store/portal/portal.state';
import { visualizationStructure} from '../../models/visualization-structure';
import {getDashboardGroupedVisualizationObjects} from '../../../../store/visualization/visualization.selectors';

@Component({
  selector: 'app-grouped-slider',
  templateUrl: './grouped-slider.component.html',
  styleUrls: ['./grouped-slider.component.css']
})
export class GroupedSliderComponent implements OnInit {

  headersOfSliders: Array<any>;
  activeSlider: number;
  isSliderStopped: boolean;
  activeSliderGroup: string;
  activeData: any;
  groupedSliderInfo$: Observable<GroupedSlidersState>;
  analyticsData$: Observable<DataState>;
  dashboardsGroups: any;
  groupedSliderInfo: any;
  scrollingInfo: any;
  visualizationObjects$: any;
  currentUser$: Observable<CurrentUserState>;
  statsSummary$: Observable<StatsSummaryState>;

  groupedDashboards$: Observable<any>;
  constructor(private router: Router,
              private store: Store<AppState>) {
    store.dispatch(new portalActions.LoadGroupedSliderDataAction());
    store.dispatch(new portalActions.LoadDataAction('dataStore/observatory/groupedSliderInfoDimensions'));
    this.groupedDashboards$ = this.store.select(getDashboardGroupedVisualizationObjects);
    this.activeSlider = 0;
    this.activeSliderGroup = 'rch0';
    this.isSliderStopped = false;
    this.currentUser$ = store.select(getCurrentUser);
    this.statsSummary$ = store.select(getStatsSummary);
    this.groupedSliderInfo$ = store.select(getGroupedSlidersInfo);
    this.analyticsData$ = store.select(getAnalyticsData);
  }

  ngOnInit() {
    this.headersOfSliders = [
      {
        'id': 'rch',
        'counter': 0,
        'name': 'RCH'
      },
      {
        'id': 'hiv_aids',
        'counter': 1,
        'name': 'HIV and AIDS'
      },
      {
        'id': 'malaria',
        'counter': 2,
        'name': 'Malaria'
      },
      {
        'id': 'tb_leprosy',
        'counter': 3,
        'name': 'TB & LEPROSY'
      },
      {
        'id': 'tracer',
        'counter': 4,
        'name': 'TRACER DRUGS'
      },
      {
        'id': 'ntd_ncd',
        'counter': 5,
        'name': 'NTD and NCD'
      },
      {
        'id': 'ivd',
        'counter': 6,
        'name': 'IVD'
      }
    ];
    if (this.groupedSliderInfo$) {
      this.groupedSliderInfo$.subscribe((groupedSliderInfo) => {
        if (groupedSliderInfo) {
          this.groupedSliderInfo = groupedSliderInfo.data;
          this.scrollingInfo = groupedSliderInfo.data['scrollingInfo'];
          this.dashboardsGroups =  [
            {
              'name': 'RCH',
              'id': 'yygBRkGZyEW',
              'dashboardItems': [
                {
                  'id': 'Kr3rMLUGAMk'
                },
                {
                  'id': 'GvNOTJEH9vy'
                },
                {
                  'id': 'v6lrdpwMezu'
                },
                {
                  'id': 'moGuMGdiB3L'
                },
                {
                  'id': 'Lp3ILj9SBCC'
                },
                {
                  'id': 'mvJfAv9l0id'
                },
                {
                  'id': 'iTihN3qFMkS'
                },
                {
                  'id': 'gDx9owfyLWN'
                },
                {
                  'id': 'LvGDdnOdRnX'
                },
                {
                  'id': 'w9GqT5JMzIC'
                },
                {
                  'id': 'jDOQoOM1lGk'
                },
                {
                  'id': 'Xoq3Q1RWSkV'
                },
                {
                  'id': 'JnngtHwAq3e'
                },
                {
                  'id': 'HJgP4cbXmOn'
                },
                {
                  'id': 'htHXnv8QzMg'
                },
                {
                  'id': 'QbkTsM9cR7L'
                },
                {
                  'id': 'CLbKdz8cdtm'
                },
                {
                  'id': 'lTWwfTsnEo3'
                },
                {
                  'id': 'syqgAN9jr3j'
                },
                {
                  'id': 'LYWKtBE4LrV'
                },
                {
                  'id': 'DGDKzZb6JOV'
                },
                {
                  'id': 'GA0jpUV9YT8'
                },
                {
                  'id': 'uLBvdUvPE2P'
                },
                {
                  'id': 'ORdL9iHxGuw'
                },
                {
                  'id': 'ubeGdNOlEqQ'
                },
                {
                  'id': 'Q1JFJAvMCmB'
                },
                {
                  'id': 'TrHfqpR54kF'
                },
                {
                  'id': 'aQ7fHe2rqly'
                },
                {
                  'id': 'nFANwqU1OB9'
                },
                {
                  'id': 'k8dvApA8Yiy'
                },
                {
                  'id': 'R6YiXEKdbLt'
                },
                {
                  'id': 'cxhyWNd3Yc8'
                },
                {
                  'id': 'zrWzMftPQzw'
                },
                {
                  'id': 'YFWLDTt7kUb'
                },
                {
                  'id': 'hUAXTndBTJo'
                },
                {
                  'id': 'OoEAY6Ahnsx'
                },
                {
                  'id': 'tmAuPyTsmA9'
                },
                {
                  'id': 'rBmUMzBQ6yo'
                },
                {
                  'id': 'HCwjmnz5QUE'
                },
                {
                  'id': 'O343Tkdbu7w'
                },
                {
                  'id': 'OvGk0wwtt9H'
                },
                {
                  'id': 'Uz6I6gDBEX1'
                },
                {
                  'id': 'pnGVRXwz3ln'
                },
                {
                  'id': 'FzlWv3FmNKN'
                },
                {
                  'id': 'Q4QGiHQWImG'
                },
                {
                  'id': 'l5QLZTXBCoX'
                },
                {
                  'id': 'lCEe0dMFNa0'
                },
                {
                  'id': 'ccQ4XN58ExL'
                },
                {
                  'id': 'OMR17d1Gp1Q'
                },
                {
                  'id': 'wlByXUfOfnJ'
                }
              ]
            },
            {
              'name': 'HIV/AIDS',
              'id': 'KOSUh5WCB70',
              'dashboardItems': [
                {
                  'id': 'E7cqUV5IuwY'
                },
                {
                  'id': 'lE5mJqlJq3u'
                },
                {
                  'id': 'wH50LGAkHYD'
                },
                {
                  'id': 'vGZ8d64aVto'
                }
              ]
            },
            {
              'name': 'CERVICAL CANCER',
              'id': 'lCpO4gUXH2V',
              'dashboardItems': [
                {
                  'id': 'SCkRVUfOLVs'
                },
                {
                  'id': 'GjB337AhSl0'
                },
                {
                  'id': 'qaLkGgATRl9'
                },
                {
                  'id': 'BoZ9PZGtBas'
                },
                {
                  'id': 'ECSlwCgf2t0'
                },
                {
                  'id': 'WO2pSKws5wP'
                },
                {
                  'id': 'x40Z4eMASP2'
                },
                {
                  'id': 'UOQRBxrZiAD'
                },
                {
                  'id': 'NC53k4qkCrr'
                },
                {
                  'id': 'RVUsoRSPzl5'
                },
                {
                  'id': 'gQwzkLBXdFn'
                }
              ]
            },
            {
              'name': 'EYE HEALTH',
              'id': 'g0xgWhZ6zOx',
              'dashboardItems': [
                {
                  'id': 'hkKT4BVvWVD'
                },
                {
                  'id': 'WZn1nh2L3tA'
                },
                {
                  'id': 'PjrnsZI1LBb'
                },
                {
                  'id': 'fbPhaCybtYm'
                }
              ]
            },
            {
              'name': 'GBV & VAC',
              'id': 'AxHTuYXEMeu',
              'dashboardItems': [
                {
                  'id': 'EnVEvFYU1e0'
                },
                {
                  'id': 'UZDquI9QVAE'
                },
                {
                  'id': 'WBSZJNYew2j'
                },
                {
                  'id': 'lwwEgmaeD9Q'
                },
                {
                  'id': 'kdOtgKY9ZSt'
                },
                {
                  'id': 'eYwra2gaka6'
                }
              ]
            },
            {
              'name': 'GENERAL INFORMATION',
              'id': 'hwJNMC3LrPd',
              'dashboardItems': [
                {
                  'id': 'gRQB9dehrwl'
                },
                {
                  'id': 'RucVrjMy28y'
                },
                {
                  'id': 'aYVMlDLWFve'
                },
                {
                  'id': 'ZmkWGr3bOKC'
                },
                {
                  'id': 'gPQLxPZ8oc9'
                },
                {
                  'id': 'cnqbYxy8rOg'
                },
                {
                  'id': 'YDpOKS3zA9F'
                },
                {
                  'id': 'vCs667Jka23'
                },
                {
                  'id': 'vAoeicrgETI'
                }
              ]
            },
            {
              'name': 'HMIS&RCHS RAW DATA',
              'id': 'duUJrQbZF9h',
              'dashboardItems': [
                {
                  'id': 'my5zdoTkt6d'
                },
                {
                  'id': 'D9qNtSGoBQ4'
                },
                {
                  'id': 'wuyVMV0Ybjh'
                },
                {
                  'id': 'KjpurR055wR'
                },
                {
                  'id': 'oxiUa1QoS9v'
                },
                {
                  'id': 'omnaQ5cqo2i'
                },
                {
                  'id': 'zCc2ECP8eeg'
                },
                {
                  'id': 'KZfqPFHyYJc'
                },
                {
                  'id': 'Cdd6gybnRo5'
                }
              ]
            },
            {
              'name': 'IVD',
              'id': 'wazXFS5KbST',
              'dashboardItems': [
                {
                  'id': 'P4Zt7MStnrx'
                },
                {
                  'id': 'N4PgVAH6dZt'
                },
                {
                  'id': 'vigaEXDzkJA'
                },
                {
                  'id': 'RBNi3uG9if1'
                },
                {
                  'id': 'IBNqYgwBU8Y'
                },
                {
                  'id': 'ZLo58YmzOyt'
                },
                {
                  'id': 'q7O4VJhOqFa'
                },
                {
                  'id': 'pzn0NxZVtoo'
                },
                {
                  'id': 'k7qxPQ70cGm'
                },
                {
                  'id': 'prFEaXm8nGW'
                }
              ]
            },
            {
              'name': 'MALARIA',
              'id': 'gdeaYoJncPv',
              'dashboardItems': [
                {
                  'id': 'qIoKh7DXqEk'
                },
                {
                  'id': 'kEYQMziOdz0'
                },
                {
                  'id': 'xb4V54GpBwI'
                },
                {
                  'id': 'cfXsHy7nLTw'
                },
                {
                  'id': 'fvfQFKlydtp'
                },
                {
                  'id': 'JpH17eCM2yW'
                },
                {
                  'id': 'MyHuVtnsbpM'
                },
                {
                  'id': 'lVLc3BgcwYH'
                },
                {
                  'id': 'lsNhvSMiAVF'
                },
                {
                  'id': 'dahSAmGY0yC'
                },
                {
                  'id': 'P0DajorvBpM'
                },
                {
                  'id': 'CSir8zpbn1F'
                },
                {
                  'id': 'dscfsvGCWFM'
                },
                {
                  'id': 'mDBDaF96fPb'
                },
                {
                  'id': 'CR3FLyASxrk'
                }
              ]
            },
            {
              'name': 'HIV/AIDS',
              'id': 'BvpSbg1jxoB',
              'dashboardItems': [
                {
                  'id': 'TOwPhL0mJX8'
                },
                {
                  'id': 'd3dzuEELSYX'
                },
                {
                  'id': 'hSANUXBiVo2'
                },
                {
                  'id': 'AMEq7ryz9jW'
                },
                {
                  'id': 'QqRDsTxW2BB'
                },
                {
                  'id': 'tvzbPy7WuV0'
                },
                {
                  'id': 'ajCx3NxElDB'
                },
                {
                  'id': 'M9Av0KGhDkh'
                },
                {
                  'id': 'jn5AWKquA3W'
                },
                {
                  'id': 'ZQWfZmSzSze'
                }
              ]
            },
            {
              'name': 'NON-COMMUNICABLE DISEASE',
              'id': 'kFf8g9Vlu1d',
              'dashboardItems': [
                {
                  'id': 'PjqhpkNgJmV'
                }
              ]
            },
            {
              'name': 'NTD',
              'id': 'JXfFynzipLO',
              'dashboardItems': [
                {
                  'id': 'd4oCOnXX2sn'
                },
                {
                  'id': 'isjyxRsIDD2'
                },
                {
                  'id': 'fJfN6944Aws'
                },
                {
                  'id': 'PgPQq2YwmeH'
                },
                {
                  'id': 'X2wy53SF6KT'
                }
              ]
            },
            {
              'name': 'TB & LEPROSY',
              'id': 'z0XNGIpoCk4',
              'dashboardItems': [
                {
                  'id': 'QXUitCrYlr9'
                },
                {
                  'id': 'Joe22R0hNE5'
                },
                {
                  'id': 'twFqSrJsqI7'
                },
                {
                  'id': 'kEXlxtsO1LN'
                },
                {
                  'id': 'RjqpNSfGQxp'
                },
                {
                  'id': 'Z0PzhFOvumP'
                },
                {
                  'id': 'sDEWnBNtz3n'
                },
                {
                  'id': 'vYgjGoUo6OM'
                },
                {
                  'id': 'eh31WABDRC6'
                },
                {
                  'id': 'NyaAVAbXQtC'
                },
                {
                  'id': 'pGbMofoIwJq'
                },
                {
                  'id': 'vpniFCAg1HV'
                },
                {
                  'id': 'tijVmZszsaj'
                },
                {
                  'id': 'GoDz3d5gtFR'
                }
              ]
            },
            {
              'name': 'NUTRITION',
              'id': 'a5gxZv99ivQ',
              'dashboardItems': [
                {
                  'id': 'tyG3yeF8cHs'
                },
                {
                  'id': 'Ks705WW912C'
                },
                {
                  'id': 'Mg9XhEOQGYJ'
                },
                {
                  'id': 'yV0rxf0q3aC'
                },
                {
                  'id': 'OUM9zvZbHg8'
                },
                {
                  'id': 'agSBDIsoVZ5'
                }
              ]
            },
            {
              'name': 'ORAL HEALTH',
              'id': 'zQMfce0vomU',
              'dashboardItems': [
                {
                  'id': 'EuC79VD7JRa'
                },
                {
                  'id': 'MoMfVyv6RH1'
                },
                {
                  'id': 'W2Ghn7CPrKg'
                },
                {
                  'id': 'ZODiSswPE2r'
                },
                {
                  'id': 'uTXoorf82uE'
                },
                {
                  'id': 'oR8xxbE2Sef'
                }
              ]
            },
            {
              'name': 'PMTCT',
              'id': 'vz51jAnI62D',
              'dashboardItems': [
                {
                  'id': 'mIgL85AyCQx'
                },
                {
                  'id': 'P7OjKEA9Igm'
                },
                {
                  'id': 'zh6nNFmPZKz'
                },
                {
                  'id': 'mOqAP4jB98Q'
                },
                {
                  'id': 'XlGGanf53yk'
                },
                {
                  'id': 'hwovmGHXweX'
                },
                {
                  'id': 'P37fh2h9EVO'
                },
                {
                  'id': 'WnyrMrpm4VH'
                },
                {
                  'id': 'dGdsYXB5lFV'
                }
              ]
            },
            {
              'name': 'Tracer drugs',
              'id': 'eWsJEyIfU8G',
              'dashboardItems': [
                {
                  'id': 'lEcT2kNgo6y'
                },
                {
                  'id': 'cJqlSdPMdHl'
                },
                {
                  'id': 'YCtYeMtV9o7'
                },
                {
                  'id': 'P96in8O7NlR'
                },
                {
                  'id': 'ReDXHjEzk8D'
                },
                {
                  'id': 'a4oHAviudAJ'
                },
                {
                  'id': 'ejqvMAFP7kX'
                },
                {
                  'id': 'gHem1kDKjV3'
                },
                {
                  'id': 'hKyl4cJwWe0'
                },
                {
                  'id': 'SFpsJBpfpDy'
                },
                {
                  'id': 'f9660GYFQdl'
                },
                {
                  'id': 'hA79ki4a43A'
                },
                {
                  'id': 'YUFzJ9DXi7q'
                },
                {
                  'id': 'ky1CuKxy8By'
                },
                {
                  'id': 'UCNCmC9fVVN'
                },
                {
                  'id': 'tIJHuuocRIf'
                },
                {
                  'id': 'NfnyRWC9m1D'
                },
                {
                  'id': 'MXUjVtjNK9u'
                },
                {
                  'id': 'fgD3Bf8EQRp'
                },
                {
                  'id': 'gLiPxDexaSj'
                },
                {
                  'id': 'ml5zDzS45en'
                },
                {
                  'id': 'UZqN5on0w3Q'
                },
                {
                  'id': 'xrcdjDGio8Y'
                },
                {
                  'id': 'oHle3ts57az'
                },
                {
                  'id': 'nrRzbxiczjU'
                },
                {
                  'id': 'hMM9Zr8LsGy'
                }
              ]
            },
            {
              'name': 'VMCC',
              'id': 'n4MDSZ0z5nZ',
              'dashboardItems': [
                {
                  'id': 'FVFiwKpwfc0'
                }
              ]
            },
            {
              'name': 'Star Rating',
              'id': 'Tk50PilnEbr',
              'dashboardItems': [
                {
                  'id': 'zCOPr3uyytx'
                },
                {
                  'id': 'GV5UTl0E5Df'
                }
              ]
            }
          ];
        }
      });
    }

    this.sliderTiming(this.isSliderStopped, this.activeSliderGroup);
  }

  stopSlider(id, groupedSliderInfo) {
    console.log('visualizationObject', JSON.stringify(groupedSliderInfo));
    this.isSliderStopped = true;
    this.activeSliderGroup = id;
    this.activeSlider = -1;
    this.activeData = groupedSliderInfo;
    this.sliderTiming(true, this.activeSliderGroup);
  }

  sliderTiming(sliderStopped, activeSliderGroup) {
    if (!sliderStopped && activeSliderGroup === 'rch0') {
      const intervalTime = interval(15000);
      intervalTime.subscribe((countTime) => {
        // console.log(countTime);
        if (this.activeSlider <= 6 && this.activeSlider >= 0) {
          if (this.headersOfSliders[this.activeSlider].counter === this.activeSlider) {
            try {
              const buttons = document.getElementsByClassName('grouped-sliders-header-btn');
              for (let count = 0; count <= 6; count++) {
                document.getElementById(buttons[count].id).style.backgroundColor = '#eee';
                document.getElementById(buttons[count].id).style.color = '#222';
              }
              this.activeSliderGroup = this.headersOfSliders[this.activeSlider].id + this.headersOfSliders[this.activeSlider].counter;
              document.getElementById(this.headersOfSliders[this.activeSlider].id + this.activeSlider).style.backgroundColor = '#2A8FD1';
              document.getElementById(this.headersOfSliders[this.activeSlider].id + this.activeSlider).style.color = '#FFF';
            } catch (e) {
              console.log(e);
            }
          }
          this.activeSlider++;
        } else if (this.activeSlider > 6) {
          this.activeSlider = 0;
        }
      });
    } else {
      try {
        const buttons = document.getElementsByClassName('grouped-sliders-header-btn');
        for (let count = 0; count <= 6 ; count++) {
          document.getElementById(buttons[count].id).style.backgroundColor = '#eee';
          document.getElementById(buttons[count].id).style.color = '#222';
        }
        this.activeSliderGroup = activeSliderGroup;
        document.getElementById(activeSliderGroup).style.backgroundColor = '#2A8FD1';
        document.getElementById(activeSliderGroup).style.color = '#FFF';
      } catch (e) {
        console.log(e);
      }
    }
  }
}
