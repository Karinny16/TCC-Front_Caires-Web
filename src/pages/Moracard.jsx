
import style from './Moracard.module.css'

const Moradorcard = ({id_morador, nome, ramal, telefone})=>{
    return(
        

            <div className="dive-label">
              <div className="div-label">
            
              
                  <div  className="text-container">
                    <text className="text-fields">{nome}</text>
                  </div>
   
              </div>
              <div className="div1-label">
           
          
                  <div  className="text-container">
                    <text className="text-fields">{ramal}</text>
                  </div>
   
              </div>
              <div className="div2-label">
                
         
                  <div  className="text-container">
                    <text className="text-fields">{telefone}</text>
                  </div>
    
              </div>
            </div>
      
        
    )
}

export default Moradorcard