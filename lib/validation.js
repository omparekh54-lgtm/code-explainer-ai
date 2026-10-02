export const MAX_CODE_LENGTH = 4000;
export function validateInput(body) {
  if (!body || typeof body.code !== 'string' || !body.code.trim()) throw new Error('Paste some code first.');
  if (body.code.length > MAX_CODE_LENGTH) throw new Error('Keep your code under 4,000 characters.');
  if (body.code.split('\n').length > 100) throw new Error('Keep your snippet under 100 lines.');
  if (!['beginner','intermediate','advanced'].includes(body.level)) throw new Error('Choose a valid learning level.');
  return {code:body.code.replace(/\r\n/g,'\n'),level:body.level};
}
const text = (value, max=6000) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
export function validateExplanation(data, code) {
  if (!data || !text(data.summary) || !Array.isArray(data.lines) || !Array.isArray(data.concepts) || !Array.isArray(data.quiz)) throw new Error('Invalid explanation format.');
  const source=code.split('\n'), required=source.map((s,i)=>s.trim()?i+1:null).filter(Boolean);
  const seen=new Set();
  for (const line of data.lines) {
    if (!Number.isInteger(line.number) || !required.includes(line.number) || seen.has(line.number) || !text(line.explanation,2000)) throw new Error('Invalid line explanation.');
    seen.add(line.number);
    line.code=source[line.number-1];
  }
  if (required.some(n=>!seen.has(n))) throw new Error('Missing line explanations.');
  data.lines.sort((a,b)=>a.number-b.number);
  if(data.concepts.length<1 || data.concepts.length>8 || data.concepts.some(c=>!text(c.name,100)||!text(c.explanation,2000))) throw new Error('Invalid concepts.');
  if(data.quiz.length<1 || data.quiz.length>5 || data.quiz.some(q=>!text(q.question,1000)||!Array.isArray(q.options)||q.options.length!==4||q.options.some(o=>!text(o,1000))||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||!text(q.explanation,2000))) throw new Error('Invalid quiz.');
  return {summary:data.summary,lines:data.lines.map(({number,code,explanation})=>({number,code,explanation})),concepts:data.concepts.map(({name,explanation})=>({name,explanation})),quiz:data.quiz.map(({question,options,answer,explanation})=>({question,options,answer,explanation}))};
}
