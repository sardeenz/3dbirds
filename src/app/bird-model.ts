export interface BirdModel {
        name: string;
        isSystemMaintained: boolean;
    }

    export interface SpatialReference {
        wkid: number;
        latestWkid: number;
    }

    export interface Field {
        name: string;
        type: string;
        alias: string;
        sqlType: string;
        domain?: any;
        defaultValue?: any;
        length?: number;
    }

    export interface Attributes {
        FID: number;
        GlobalID: string;
        CreationDate: any;
        Creator: string;
        EditDate: any;
        Editor: string;
        code: string;
        battery_level: string;
    }

    export interface Geometry {
        x: number;
        y: number;
    }

    export interface Feature {
        attributes: Attributes;
        geometry: Geometry;
    }

    export interface RootObject {
        objectIdFieldName: string;
        birdModel: BirdModel;
        globalIdFieldName: string;
        geometryType: string;
        spatialReference: SpatialReference;
        fields: Field[];
        features: Feature[];
        exceededTransferLimit: boolean;
    }

