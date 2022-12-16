import { Schema, model } from 'mongoose';

export interface Jewel {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    tags: string[];
}

export const JewelSchema = new Schema<Jewel>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        tags: { type: [String] },
        imageUrl: { type: String, required: true },
    },{
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
);

export const JewelModel = model<Jewel>('jewel', JewelSchema);