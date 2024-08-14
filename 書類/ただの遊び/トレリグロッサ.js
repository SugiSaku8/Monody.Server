/*
Τρελή γλώσσα
©Carnation 2022-2024
All right reverved.
*/
var Map = {
  A: "∀",
  B: "⋲",
  C: "∁",
  D: "∉",
  E: "∃",
  F: "⊧",
  G: "⋵",
  H: "⋈",
  I: "≬",
  J: "≱",
  K: "≮",
  L: "≴",
  M: "≌",
  N: "∐",
  O: "∅",
  P: "⊯",
  Q: "⊄",
  R: "∠",
  S: "∰",
  T: "∓",
  U: "⊋",
  V: "⊿",
  W: "⋓",
  X: "≙",
  Y: "∱",
  Z: "∑",
  a: "∀",
  b: "⋲",
  c: "∁",
  d: "∉",
  e: "∃",
  f: "⊧",
  g: "⋵",
  h: "⋈",
  i: "≬",
  j: "≱",
  k: "≮",
  l: "≴",
  m: "≌",
  n: "∐",
  o: "∅",
  p: "⊯",
  q: "⊄",
  r: "∠",
  s: "∰",
  t: "∓",
  u: "⊋",
  v: "⊿",
  w: "⋓",
  x: "≙",
  y: "∱",
  z: "∑",
  //特殊ゾーン
  ".": "⊹",
  "!": "∛",
  "?": "∜",
  "#": "∦",
  $: "≐",
  "%": "≗",
  "&": "≝",
  "(": "≤",
  ")": "≥",
};
var Map_in = Object.fromEntries(
 Object.entries(Map).map(([key, value]) => [value, key])
);
function converter(input, type) {
  if (type = true) {
    var output = "";
    for (var i = 0; i < input.length; i++) {
      var char = input[i];
      if (Map[char]) {
        output += Map[char];
      } else {
        output += char;
      }
    }
    return output;
  }
  if(type = false){
	     var output = "";
	      for (var i = 0; i < input.length; i++) {
		var char = input[i];
		if (Map_in[char]) {
		  output += Map_in[char];
		} else {
		  output += char;
		}
	      }
	      return output;
}
}