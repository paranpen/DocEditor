import update from 'react-addons-update'
import jsondoc from './jsondoc'

describe("json doc update test", () => {
  it("string update", () => {
    let store = update(jsondoc, {$set: {hola: 'hola'}})
    expect(store.hola).toBe('hola')
  })

  it("update", () => {
    let obj = {a: 5, b: 3}
    let newObj = update(obj, {$merge: {b: 6, c: 7}})
    expect(newObj).toEqual({a: 5, b: 6, c: 7})
  })
})