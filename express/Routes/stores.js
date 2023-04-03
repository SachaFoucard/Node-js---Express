const express = require('express');
const data = require('../db/stores.json');
const allStores = data;

const StoreRouter = express.Router();

//מציג את כל החנויות ואת כל הפריטים שיש בכל חנות 
StoreRouter.get('/', async (req, res) => {
    res.status(200).json(allStores);
});

//  מציג את החנות הרלוונטית וכל הפריטים הקיימים בה. במידה והחנות אינה קיימת יש להציג הודעה מתאימה. 
StoreRouter.get(`/:id`, async (req, res) => {
    let {
        id
    } = req.params;

    let stores = allStores.find((s) => s.id == id);

    if (stores) {
        res.status(200).json(stores);
    } else {
        res.status(404).json({
            message: "store not found"
        });
    }
});
// מציג מוצר מסוים בחנות מסוימת. במידה ואין, יש להציג הודעה מתאימה. // get specific item from store
StoreRouter.get('/:store/:itemId', async (req, res) => {
    let {
        store,
        itemId
    } = req.params;

    let nameStore = allStores.find((s) => s.storeName == store)
    if (nameStore) {
        let item = nameStore.items.find((item) => item.id == itemId);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({
                message: "product not found"
            });
        }
    } else {
        res.status(404).json({
            message: "product not found"
        });
    }
})
//הוספת חנות לקובץ json 
StoreRouter.post('/add', async (req, res) => {
    let {
        id,
        storeName,
        city,
        items
    } = req.body;

    let store = {
        id,
        storeName,
        city,
        items
    }
    allStores.push(store)
    res.status(201).json(allStores);
})

//הוספת פריט למערת הפריטים של חנות מסוימת
StoreRouter.post('/:store/items/add', async (req, res) => {
    let {
        store
    } = req.params;

    let {
        id,
        name,
        price,
        discount
    } = req.body;

    let item = {
        id,
        name,
        price,
        discount
    }

    let checkStore = allStores.find((s) => s.storeName == store)
    if (checkStore) {
        let CheckItem = checkStore.items.find((i) => i.name == item.name);
        if (CheckItem) {
            res.status(404).json({
                message: "this item already exist in the store"
            })
        } else {
            checkStore.items.push(item);
            res.status(201).json(item)
        }
    } else {
        res.status(404).json({
            message: "store not found"
        })
    }
})




module.exports = StoreRouter;