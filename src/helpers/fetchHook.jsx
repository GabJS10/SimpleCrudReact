const MyFetch = () => {
     const defaultHeaders = {
         "Content-Type": "application/json"
     }
     
     const genericFetch = async (url,options) => {
          if(options.method!="delete"){
               options.headers = defaultHeaders
               if(options.data){
                    options.body = JSON.stringify(options.data)
                    delete options.data
               }
          }
          //console.log(url,options);
          try {
               const response = await fetch(url,options)
               
               if (!response.ok) {
                    const error = {
                         error:true,
                         message:response.statusText || "Error occurs",
                         code:response.status
                    };
                    throw error
               }

               const data = await response.json();

               return data

          } catch (error) {
               return error
          }
     }

     const get = (url,options = {}) => {
          options.method="get"
          return genericFetch(url,options)
     }

     const optionsCors = (url,options = {}) => {
          options.method="options"
          return genericFetch(url,options)
     }

     const post = (url,options = {}) => {
          options.method="post"
          return genericFetch(url,options)
     }

     const put = (url,options = {}) => {
          options.method="put"
          return genericFetch(url,options)
     }

     const deleted = (url,options = {}) => {
          options.method = "delete"
          return genericFetch(url,options)

     }

     return {
          get,
          post,
          put,
          deleted,
          optionsCors
     }
}

export default MyFetch