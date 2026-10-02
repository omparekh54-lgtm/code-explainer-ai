export class AppError extends Error {constructor(status,message){super(message);this.status=status;}}
export function validateInput(body){
 if(!body || typeof body.code!=='string' || !body.code.trim()) throw new AppError(400,'Paste some code before continuing.');
 if(body.code.length>4000) throw new AppError(400,'Please keep your code under 4,000 characters.');
 if(body.code.split('\n').length>80) throw new AppError(400,'Please keep your snippet to 80 lines or fewer.');
 if(!['beginner','intermediate','advanced'].includes(body.level)) throw new AppError(400,'Choose a valid learning level.');
 if(!['Auto-detect','Python','JavaScript','TypeScript','Java','C++','C','SQL','Go','Rust','HTML','CSS'].includes(body.language)) throw new AppError(400,'Choose a supported language.');
 return {code:body.code.replace(/\r\n/g,'\n'),level:body.level,language:body.language};
}
const string = (s,max=10000)=>typeof s==='string' && s.length>0 && s.length<=max;
export function validateResult(data,code){
 const inputLines=code.split('\n');
 if(!data || !string(data.summary) || !Array.isArray(data.lines) || data.lines.length!==inputLines.length) throw new AppError(502,'The AI returned an incomplete explanation. Please try again.');
 if(data.lines.some((line,i)=>line.number!==i+1 || !string(line.explanation,5000))) throw new AppError(502,'The AI returned invalid line explanations. Please try again.');
 if(!Array.isArray(data.concepts) || data.concepts.length<1 || data.concepts.length>12 || data.concepts.some(c=>!string(c.name,200)||!string(c.explanation,3000))) throw new AppError(502,'The AI returned invalid concepts. Please try again.');
 if(!Array.isArray(data.quiz) || data.quiz.length<2 || data.quiz.length>5 || data.quiz.some(q=>!string(q.question,2000)||!Array.isArray(q.options)||q.options.length!==4||new Set(q.options).size!==4||q.options.some(o=>!string(o,2000))||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||!string(q.explanation,3000))) throw new AppError(502,'The AI returned an invalid quiz. Please try again.');
 if(!Array.isArray(data.notes) || data.notes.length>8 || data.notes.some(n=>!string(n,3000))) throw new AppError(502,'The AI returned invalid notes. Please try again.');
 return {summary:data.summary,lines:data.lines.map((line,i)=>({number:i+1,code:inputLines[i],explanation:line.explanation})),concepts:data.concepts,quiz:data.quiz,notes:data.notes};
}
export const responseSchema={type:'object',required:['summary','lines','concepts','quiz','notes'],properties:{summary:{type:'string'},lines:{type:'array',items:{type:'object',required:['number','explanation'],properties:{number:{type:'integer'},explanation:{type:'string'}}}},concepts:{type:'array',items:{type:'object',required:['name','explanation'],properties:{name:{type:'string'},explanation:{type:'string'}}}},quiz:{type:'array',items:{type:'object',required:['question','options','answer','explanation'],properties:{question:{type:'string'},options:{type:'array',items:{type:'string'}},answer:{type:'integer'},explanation:{type:'string'}}}},notes:{type:'array',items:{type:'string'}}}};
