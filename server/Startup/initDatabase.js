import Profession from '../models/Profession.js';
import Quality from '../models/Quality.js';

// Use import attributes (new syntax in Node.js 22+)
import professionMock from '../mock/profession.json' with { type: 'json' };
import qualitiesMock from '../mock/qualities.json' with { type: 'json' };

export default async () => {
    const professions = await Profession.find();
    if (professions.length !== professionMock.length) {
        await createInitialEntity(Profession, professionMock);
        console.log('Professions initialized');
    }

    const qualities = await Quality.find();
    if (qualities.length !== qualitiesMock.length) {
        await createInitialEntity(Quality, qualitiesMock);
        console.log('Qualities initialized');
    }
    console.log('Database initialized successfully!');
};

async function createInitialEntity(Model, data) {
    try {
        await Model.collection.drop();
    } catch (error) {
        console.log('Collection drop skipped:', error.message);
    }

    return Promise.all(
        data.map(async item => {
            try {
                delete item.id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch(e) {
                console.error('Error creating entity:', e);
                return e;
            }
        })
    );
}