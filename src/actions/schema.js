import { schema } from 'normalizr';

export const workday = new schema.Entity(
    'workdays',
    {},
    {
        idAttribute: '_id'
        // processStrategy: (entity, parent) => ({
        //     ...entity,
        //     monthId: parent._id
        // })
    }
);

export const month = new schema.Entity(
    'months',
    {
        workdays: [workday]
    },
    {
        idAttribute: '_id'
    }
);
