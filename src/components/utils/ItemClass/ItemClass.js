function ccyFormat(num) {
  let numFloat = parseFloat(num)
  return `${numFloat.toFixed(2)}`;
}

class ItemClass {
  calcularPrecio(item, dolar) {
    let precioConIva=parseFloat(item.precioConIva)
    let iva=item.iva
    let precio=parseFloat(item.price)
    let usd=parseFloat(item.usd)
    let qty=1
    let oferta=item.oferta
    let precioOferta=parseFloat(item.precioOferta)

    let price = (oferta && oferta == "si" && precioOferta) ? ccyFormat(precioOferta) : parseFloat(precio)
    /* le saco el iva si viene incluido */
    let resultado = (precioConIva ? parseFloat(precioConIva) / (1 + (parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva)) / 100) : parseFloat((usd && `${usd}` != "0") ? usd * dolar : `${price}`)) * (qty ? parseFloat(qty) : 1);
    return ccyFormat(parseFloat(resultado))

  }
  /* Backup funcion anterior */
  calcularPrecio2(item, dolar) {
    if (item.oferta && item.oferta == "si" && item.precioOferta) {
      return ccyFormat(item.precioOferta)
    }
    // let pesos = item.price ? item.price : (item.usd ? item.usd*dolar : "") 
    let pesos = item.usd ? (item.usd ? item.usd * dolar : "") : parseFloat(item.price);
    let iva = parseFloat(typeof item.iva === "string" ? item.iva.replace(/,/g, '.').replace(/%/g, '') : item.iva)
    let precio = item.precioConIva ? ccyFormat(item.precioConIva / (1 + iva / 100)) : (pesos ? `$ ${ccyFormat(pesos)}` : "NO DISPONIBLE")
    return ccyFormat(pesos)
  }
  calcularPrecioContext(precioConIva, iva, precio, usd, qty, oferta, precioOferta, dolar) {
    let price = (oferta && oferta == "si" && precioOferta) ? ccyFormat(precioOferta) : parseFloat(precio)
    /* le saco el iva si viene incluido */
    // let resultado = (precioConIva ? parseFloat(precioConIva) / (1 + (parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva)) / 100) : ((price && precio != 0) ? `${price}` : usd * dolar)) * (qty ? parseFloat(qty) : 1);
    let resultado = (precioConIva ? parseFloat(precioConIva) / (1 + (parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva)) / 100) : ((usd && `${usd}` != "0") ? usd * dolar : `${price}`)) * (qty ? parseFloat(qty) : 1);
    // let resultado = (precioConIva ? parseFloat(precioConIva)/(1+(parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva))/100) : (usd ? usd*dolar : `${price}`))*(qty ? parseFloat(qty) : 1);
    return resultado
  }
  calcularPrecioCantidad(precioConIva, iva, precio, usd, qty, oferta, precioOferta, dolar) {
    let price = (oferta && oferta == "si" && precioOferta) ? ccyFormat(precioOferta) : parseFloat(precio)
    /* le saco el iva si viene incluido */
    let resultado = (precioConIva ? parseFloat(precioConIva) / (1 + (parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva)) / 100) : ((usd && `${usd}` != "0") ? usd * dolar : `${price}`)) * (qty ? parseFloat(qty) : 1);
    return ccyFormat(resultado)
  }
}
export default ItemClass;

// let precio = item.precioConIva ? ccyFormat(item.precioConIva/(1+iva/100)) : (price ? `$ ${ccyFormat(price)}` : "NO DISPONIBLE")