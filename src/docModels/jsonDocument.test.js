import update from 'react-addons-update'
import jsondoc from './jsonDocument'

describe("json doc update test", () => {
  it("string update", () => {
    let store = update(jsonDocument, {$set: {hola: 'hola'}})
    expect(store.hola).toBe('hola')
  })

  it("remove the first attribute", () => {
		let attrs = []
		for( let attr in jsonDocument ){
			attrs.push(attr)
		}

    let newObj = update(jsonDocument, {$set: {[attrs[0]]: null}})
    expect(newObj[attrs[0]]).toEqual(null)
  })

})

