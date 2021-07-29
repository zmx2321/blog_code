const express = require('express');
const server = express();

server.listen(2831);

server.use('/get',(req,res)=>{
	res.send(['中国','俄罗斯','瑞士','新西兰'])
})

server.use(express.static('./'))