const SMTPServer = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;

const server = new SMTPServer({
	authOptional: true,
	onData(stream, session, callback){
		//stream.pipe(process.stdout); // print message to console
		simpleParser(stream).then(mail=>{
			var fromemail = mail.from.value[0].address;
			var fromname = mail.from.value[0].name;
			var toemail = mail.to.value[0].address;
			var toname = mail.to.value[0].name;
			var date = mail.date;
			var body = mail.text;
			var subject = mail.subject;
			console.log('From: ' + fromemail);
			console.log('To: ' + toemail);
			console.log('Date: ' + date);
			console.log('Subject: ' + subject);
			console.log('Body: ' + body);
		}).catch(err=>{})
		stream.on('end', callback);
    	}
});
server.listen(26);
