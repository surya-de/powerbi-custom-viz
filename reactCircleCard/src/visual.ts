"use strict";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactCircleCard, initialState } from "./component";   
//import { Card, initialCardState } from "./card";
import IViewport = powerbi.IViewport;

import "./../style/visual.less";

export class Visual implements IVisual {
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    private target: HTMLElement;
    private viewport: IViewport;
    private reactRoot: React.ComponentElement<any, any>;

    constructor(options: VisualConstructorOptions) {
        this.reactRoot = React.createElement(ReactCircleCard, {});
        this.target = options.element;
        this.formattingSettingsService = new FormattingSettingsService();

        ReactDOM.render(this.reactRoot, this.target);
    }

    public update(options: VisualUpdateOptions) {
        console.log(options.dataViews[0]);
        console.log('Columne Name', options.dataViews[0].table.columns[0].displayName)
        console.log('Value', options.dataViews[0].table.rows[0][1])
        if(options.dataViews && options.dataViews[0]){
            const dataView: DataView = options.dataViews[0];
            this.viewport = options.viewport;
            const { width, height } = this.viewport;
            const size = Math.min(width, height);
            this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews);
            const circleSettings = this.formattingSettings.circleCard;
            
            ReactCircleCard.update({
                textbackLabel: dataView.table.rows[1][0].toString(),
                textfrontLabel: dataView.table.rows[0][0].toString(),
                size,
                borderWidth: circleSettings.circleThickness.value,
                background: circleSettings.circleColor.value.value,
                textbackValue: dataView.table.rows[1][1].toString(),
                textfrontValue: dataView.table.rows[0][1].toString()
            });
        } else {
            this.clear();
        }
    }

    private clear() {
        ReactCircleCard.update(initialState);
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}