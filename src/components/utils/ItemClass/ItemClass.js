function ccyFormat(num) {
  let numFloat = parseFloat(num)
	return `${numFloat.toFixed(2)}`;
}

class ItemClass {
  calcularPrecio(item, dolar) {
      if (item.oferta && item.oferta=="si" && item.precioOferta) {
        return ccyFormat(item.precioOferta)
      }
      let pesos = item.price ? item.price : (item.usd ? item.usd*dolar : "") 
      let iva = parseFloat(typeof item.iva === "string" ? item.iva.replace(/,/g, '.').replace(/%/g, '') : item.iva)
      let precio = item.precioConIva ? ccyFormat(item.precioConIva/(1+iva/100)) : (pesos ? `$ ${ccyFormat(pesos)}` : "NO DISPONIBLE")
      return ccyFormat(pesos)
  }
}
export default ItemClass;

// let precio = item.precioConIva ? ccyFormat(item.precioConIva/(1+iva/100)) : (price ? `$ ${ccyFormat(price)}` : "NO DISPONIBLE")