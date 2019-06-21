# DHIS2 Menu

Menu module for dhis2 applications based on angular 6

## installation

`npm install @hisptz/ngx-dhis2-menu`

## Usage

If the module is to be imported in the app.module, then import as

`import { NgxDhis2MenuModule } from '@hisptz/ngx-dhis2-menu';`

then add this in the imports

```
imports: [
    ...
    NgxDhis2MenuModule,
    ...
    ]
```

Note: Menu component make a use of animations from angular, in this case you have to import BrowserAnimationsModule in app.module.ts

`import { BrowserAnimationsModule } from '@angular/platform-browser/animations';`

```
imports: [
 ...
 BrowserAnimationsModule,
 ...
]
```

Once imported, menu can be called in as

```
<ngx-dhis2-menu></ngx-dhis2-menu>
```
