import Codeblock from "../components/Codeblock";

export default function parseMarkdown(markdown) {
  // matches a markdown codeblock
  const codeblockRegex = /(```[\s\S]*?```)/g;
  
  // splits a markdown string into parts containing either text or a codeblock
  const parts = markdown.split(codeblockRegex);

  // if message contains codeblocks, parses the split parts into components
  if (parts.length > 1) {
    // iterates through the split parts,
    // removes empty strings and converts string codeblocks into codeblock elements
    return parts.filter(Boolean).map((part, index) => {
      // if current part is a codeblock
      if (part.startsWith('```')) {
        // extracts language and code from the string codeblock
        let matches = part.match(/^```(\S*)\n([\s\S]*)\n```$/);
        let language = matches?.[1] ?? '';
        let code = matches?.[2] ?? '';

        return (
            <Codeblock key={index} language={correctLanguage(language)}>
              {code.trim()}
            </Codeblock>
        );
      // if current part is plain text
      } else {
        // if text starts with a \n, removes it
        if (part.startsWith('\n')){
          part = part.slice(1);
        }
        return (<p key={index}>{part}</p>);
      };
    });
  }

  // if no parsing is needed, returns original string
  return markdown;
}

// converts language names to the ones used by Prism.js
function correctLanguage(language) {
  
  // convert language to lowercase
  language = language.toLowerCase();
  
  switch(language) {
    case "vue": return "js";
    case "react": return "js";
    case "c++": return "cpp";
    case "c#": return "cs";
    default: return language;
  }
}