> `npm install adonis-override-factory`

Turning

```javascript
Factory.blueprint('App/Models/Subscription', async (faker, i, data = {}) => {
  return {
    user_id: data.user_id || await Factory.model('App/Models/User').create().then(user => user.id),
    plan: 'monthly',
  }
})
```

into

```javascript
const override = require('adonis-override-factory')
Factory.blueprint('App/Models/Subscription', async (faker, i, data) => {
  return override({
    user_id: () => Factory.model('App/Models/User').create(),
    plan: 'monthly',
  }, data)
})
```