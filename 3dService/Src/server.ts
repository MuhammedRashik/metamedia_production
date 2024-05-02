const serverConfig=(server:any,config:any)=>{
    const startServer=()=>{
        server.listen(config.port, () => {
            console.log(`Server listening on port ${config.port} - Meta Service`);
          });
    }
    return {
        startServer
    }
}

export default serverConfig