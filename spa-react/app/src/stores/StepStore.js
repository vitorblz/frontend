import PubSub from 'pubsub-js';

export default class StepStore{
    constructorss(steps){
        this.steps = steps;
        this.msg = 'oiii';
    }

    getSteps(){
        const requestInfo = {
            method: "GET",
        };
    
        fetch('http://localhost:3001/steps/',requestInfo)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error("Can get Steps")
                }
            }).then(list=>PubSub.publish('step',{list, msg:''}))
            .catch(error=>{
                console.log(error.message);
        });
    }

    cancelSubscription(){
        PubSub.clearAllSubscriptions();
    }
    

    saveStep(name, description){

        const requestInfo = {
            method: "POST",
            body: JSON.stringify({name:name,description:description}),
            headers: new Headers({
                "Content-Type":"application/json"
            })

        };


    
        fetch('http://localhost:3001/steps/create/',requestInfo)
            .then(response=>{
                if(response.ok){
                    this.msg = 'Register inserted!';
                    this.getSteps();
                }
                else{
             
                    response.json().then(res=>
                            PubSub.publish('step',{msg: res[0].msg}));
                    
                    throw new Error("Can not save step!")
                }
            })
            .catch(error=>{
                console.log(error.message);
            });
    }

    subscribe(cb){
        PubSub.subscribe('step',cb);
    }
}