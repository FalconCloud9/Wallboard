import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1> Welcome </h1>
      <div dangerouslySetInnerHTML={createMarkup()}></div>
    </div>
  );
}

function createMarkup() { return { __html: getScripts() } };

function getScripts() {
  const patt = /<script.*?>((.|\n)*?)<\/script>/igm;
  const htmlStr = getHTMLStr()
  var result = null;
  var startIndex = 0;// current start index of the recent scrip
  var endIndex = 0;// current end index of the recent script
  var resultHtml = "";
  while (result = patt.exec(htmlStr)) {
      const outerHTML = result[0];
      const innerHTML = result[1];
      endIndex = result.index
      var otherHtml = htmlStr.substring(startIndex, endIndex) // other tag than script
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
  resultHtml += htmlStr.substring(startIndex,htmlStr.length)
  return resultHtml
}

function getHTMLStr() {
  const str = `<a class="weatherwidget-io" href="https://forecast7.com/en/40d71n74d01/new-york/" data-label_1="NEW YORK" data-label_2="WEATHER" data-theme="original" >NEW YORK WEATHER</a>`
      + `<script>`
      + `!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');`
      + "<\/script>"
      + "<div>Another scripts</div>"
      + "<script>"
      + "console.log('msg from console')"
      + "<\/script>"
      + `<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/VisitNepal2020?src=hash&amp;ref_src=twsrc%5Etfw">#VisitNepal2020</a> Inauguration programme organized in Delhi today. Ambassador Mr Nilamber Acharya highlighted why visiting Nepal would be a &#39;lifetime experience&#39; given the country&#39;s natural, cultural and civilizational treasures. Programme included Nepali cultural performances. <a href="https://t.co/RlHsjDqcpV">pic.twitter.com/RlHsjDqcpV<\/a><\/p>&mdash; Nepal Embassy, India (@EONIndia) <a href="https://twitter.com/EONIndia/status/1214557020977688577?ref_src=twsrc%5Etfw">January 7, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8">test asdf<\/script>tests here<script src="app.js"><\/script>aa`
      + `<b>Journal:</b> <i>Disabled World</i>. Language: English. Author: Disabled World. Electronic Publication Date: 2011/07/17. Last Revised Date: 2019/11/09. Reference Title: "<i>Medical and Health Widgets for Blogs and Websites</i>", Source: <a href="https://www.disabled-world.com/calculators-charts/widgets.php">Medical and Health Widgets for Blogs and Websites</a>. Abstract: A listing of health medical and disability widget applications available for embedding on websites and blogs. Retrieved 2020-01-09, from https://www.disabled-world.com/calculators-charts/widgets.php - Reference Category Number: DW#286-8210.`
      return str;
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


export default App;
