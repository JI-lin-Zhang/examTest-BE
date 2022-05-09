// {app_root}/app/schema/users.js

module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'user id'
    },
    name: {
      type: 'string',
      description: 'user name'
    },
    age: {
      type: 'number',
      description: 'user age'
    },
  },
  required: [ 'id', 'name', 'age' ],
  additionalProperties: false,
};