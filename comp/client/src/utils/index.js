export function createMarkup(src) { return { __html: getScripts(src) } };

function getScripts(src) {
  const patt = /<script.*?>((.|\n)*?)<\/script>/igm;
  const htmlStr = src;
  var result = null;
  var startIndex = 0;// current start index of the recent scrip
  var endIndex = 0;// current end index of the recent script
  var resultHtml = "";
  while (result = patt.exec(htmlStr)) {
      const outerHTML = result[0];
      const innerHTML = result[1];
      endIndex = result.index
      var otherHtml = htmlStr.substring(startIndex, endIndex) // other tag than script
      var finalscripts = ""
      var attributes = getAttributes(result[0])
      if (doesAttributeContains(attributes, "src")) { // insert the script tag in head
          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          attributes.forEach(attribute => {
              if (attributes == "async") script.async = true;
              else script[attribute.key] = attribute.val;
          })
          head.appendChild(script);
          resultHtml += otherHtml
      } else { // we need to now inject this script
          resultHtml += otherHtml
              + `<img src="errimg" style="display:none" onerror="${innerHTML}"></img>`
      }
      startIndex = endIndex + outerHTML.length
  }
  resultHtml += htmlStr.substring(startIndex, htmlStr.length)
  return resultHtml
}

function getAttributes(data) {
  const patt = new RegExp("<script.*?( .*?)>", "igm")
  let result = null
  let scripts = []
  result = patt.exec(data)
  const attributes = []
  let attrStr = ""
  if (result.length > 1) {
      const rawAttributes = result[1].split(" ")
      rawAttributes.forEach(item => {
          const rawAttribute = item.split("=")
          if (rawAttribute[0].trim() == "") return;
          const attribute = {
              key: rawAttribute[0].trim(),
              val: rawAttribute.length > 1 ? rawAttribute[1].trim().replace(/\"/g, "") : 0
          }
          attributes.push(attribute)
      })
  }
  if (attributes.length != 0) scripts.push(attributes);
  return attributes
}

function doesAttributeContains(attributes, key) {
  for (const attribute of attributes) {
      if (attribute.key == key) return true
  }
  return false
}

