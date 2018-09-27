// jIMU (WAB) imports:

/// <amd-dependency path="jimu/BaseWidget" name="BaseWidget" />
declare var BaseWidget: any; // there is no ts definition of BaseWidget (yet!)

// declareDecorator - to enable us to export this module with Dojo's "declare()" syntax so WAB can load it:
import declare from './support/declareDecorator';

// esri imports:
import FeatureLayer from 'esri/layers/FeatureLayer';
import EsriMap from 'esri/map';
import FeatureSet from 'esri/tasks/FeatureSet';
import Query from 'esri/tasks/query';

// dojo imports:
import * as on from 'dojo/on';

interface IConfig {
  demoSetting: string;
}
interface IWidget {
  baseClass: string;
  config?: IConfig;
}

@declare(BaseWidget)
class Widget implements IWidget {
  public baseClass: string = 'my-widget';
  public config: IConfig;

  private map: EsriMap;
  private widgetWrapper: HTMLElement;

  private postCreate(args: any): void {
    const self: any = this;
    self.inherited(arguments);

    this.widgetWrapper.innerHTML = this.config.demoSetting;
    this.createLayer();
  }

  /**
   * Example of adding a layer to the map, and querying the features.
   */
  private createLayer(): void {
    const layer: FeatureLayer = new FeatureLayer(
      'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Recreation/FeatureServer/0',
    );
    on.once(this.map, 'update-end', (evt) => {
      console.log('evt', evt);
      this.queryLayer(layer);
    });
    this.map.addLayers([layer]);
  }

  private queryLayer(layer: FeatureLayer): void {
    const query: Query = new Query();
    query.where = 'facility = 8';
    query.outFields = ['*'];
    layer.queryFeatures(query).then((results: FeatureSet) => {
      console.log('query results:', results.features);
    });
  }
}

export = Widget;
