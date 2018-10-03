import {saveStep, listStep, message} from '../actions/';

export default class StepAPI{

    static getSteps(){

        return dispatch =>{
            this.getSteplist()
                .then(list=>{
                    dispatch(listStep(list));
                    return list;
                });
        }
    }

    static getSteplist(){
        const requestInfo = {
            method: "GET",
        };

        return fetch('http://localhost:3001/steps/',requestInfo)
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error("Can get Steps")
            }
        })
        .catch(error=>{
            console.log(error.message);
        });
    }
    

    static saveStep(name, description){

        const requestInfo = {
            method: "POST",
            body: JSON.stringify({name:name,description:description}),
            headers: new Headers({
                "Content-Type":"application/json"
            })

        };

        return dispatch => {
            fetch('http://localhost:3001/steps/create/',requestInfo)
            .then(response=>{
                let msg = '';
                this.getSteplist().then(list=>{
                    if(response.ok){
                        msg = 'Register inserted!';
                        dispatch(saveStep(list));
                    }
                    else{
                        msg = "Can not save step!";
                        response.json().then(res=> {
                            throw new Error(msg)
                        })
                        .catch(error=>{
                            console.log(error.message);
                        });      
                    }
      
                    dispatch(message(msg));

                });
            })
            .catch(error=>{
                console.log(error.message);
            });
        }
    }


}