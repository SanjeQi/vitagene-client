import React from 'react'
import logo from '../logo.svg';


const Result = ({report}) => {

const getTrait = name => {
    return report.find(r => r.trait === `${name}`)
}


const getScore = name => {
   return report.find(r => r.trait === `${name}`).score
}

 

const getStack = () => {
    const stack = []
    for (const i of report)  {
        if (getScore(i.trait) < 2 )
       { 
        switch (i.trait) {
            case "Folate":
            stack.push("Folic Acid");
            break;
            case "Skin Pigmentation":
            stack.push("Vitamin D");
            break;
            case "Sleep duration":
            stack.push("Melatonin");
            break;
            default:stack.push(i.trait) }
        }
    }
    return stack
}

// const refactorStack = (s) => {
//     console.log(s)
//     s.forEach(vitamin => {
//         switch (vitamin) {
//             case "Folate":
//             vitamin = "Folic Acid";
//             case "Skin Pigmentation":
//             vitamin = "Vitamin D";
//             case "Sleep duration":
//             vitamin = "Melatonin";
//             default: vitamin = vitamin
//         }

//     })
//     console.log(s)
// }

 







return (

<div className="splash">
    <h2>Your Vitamin Stack</h2>
     {getStack().map(vitamin => 

        <p>{vitamin}</p> )}
<img src={logo} className="App-logo" alt="logo" />
          
    
</div>
    )
}
 export default Result