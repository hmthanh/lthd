export const fetchFrom = (url, method, data={}) => fetch(url, {
                                                                method: method, // *GET, POST, PUT, DELETE, etc.
                                                                mode: 'cors', 
                                                                headers:{
                                                                    'Content-Type': 'application-json'
                                                                },
                                                                credentials: 'same-origin',
                                                                body: JSON.stringify(data) 
                                                              })