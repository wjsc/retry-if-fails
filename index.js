const sleep = milliseconds => new Promise( 
  resolve => setTimeout( _ => resolve(), milliseconds )
)

module.exports = (process, checkCorrect, retries, wait = 0) => 
  new Promise( async ( resolve, reject ) => {
    let result;
    for(let i = 0; i < retries ; i++){
      if( wait > 0 && i !== 0 ) await sleep(wait)
      result = await process();
      if(checkCorrect(result)) return resolve(result);
    }
    reject(result);
  });
