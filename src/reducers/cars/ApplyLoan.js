 const defaultLoan = [];
 //{
//                 clientId:"",
//                 loanAmount:0,
//                 carCost:0,
//                 emi:0,
//                 selectedFile:"",
//                 time:0
// };
    
    export default (state=defaultLoan,action) => {
        switch(action.type){
            case 'APPLIED_LOANS':
                return [].concat(action.loans);
                // return {
                // ...state,
                // clientId:action.clientId,
                // loanAmount:action.loanAmount,
                // carCost:action.carCost,
                // emi:action.emi,
                // selectedFile:action.selectedFile,
                // time:action.time
                // }
                
            default:
                 return state;
        }
    }

    