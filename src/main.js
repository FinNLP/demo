const updateTree = require("./tree");
const dict = require("./annotations");
const Fin = require("finnlp");

require("fin-emphasis");
require("fin-sentiment");
require("fin-negation");
require("fin-sentence-type");
require("fin-html-entities");
require("fin-urls");
require("fin-ukus");

var app = new Vue({
	el: '#app',
	data:{
		abbr:true,
		input:"",
		sentences:[],
		emphasis:[],
		negation:[],
		sentiment:[],
		ukus:[],
		types:[],
	},
	watch:{
		"input":function(input){
			var instance = new Fin.Run(input);
			app.emphasis = instance.emphasis();
			app.negation = instance.negation();
			app.sentiment = instance.sentiment();
			app.ukus = instance.tokenScores();
			app.types = instance.sentenceType();
			if(!app.abbr) {
				instance.sentences = instance.sentences.map((sentence,sentenceIndex)=>{
					sentence.tags = sentence.tags.map(x=>dict.POS[x]);
					sentence.deps = sentence.deps.map(x=>{
						x.label = dict.DEPS[x.label];
						return x;
					});
					return sentence;
				});
			}
			app.sentences = instance.sentences;
			instance.sentences.forEach((sentence,index)=>{
				var id = "tree"+index; 
				if(document.getElementById(id)) document.getElementById(id).innerHTML = "";
				updateTree([sentence.depsTree],id);
			});
		}
	}
});