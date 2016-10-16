import update from 'react-addons-update'
import jsondoc from './jsondoc'

describe("json doc update test", () => {
  it("string update", () => {
    let store = update(jsondoc, {$set: {hola: 'hola'}})
    expect(store.hola).toBe('hola')
  })

  it("remove the first attribute", () => {
		let attrs = []
		for( let attr in jsondoc ){
			attrs.push(attr)
		}

    let newObj = update(jsondoc, {$set: {[attrs[0]]: null}})
    expect(newObj[attrs[0]]).toEqual(null)
  })

})

