module.exports = {
	name: '/matcha',
	description: 'Role!',
	execute(msg, args) {
	  msg.reply(JSON.stringify(args));

	  const guild = msg.member.guild;
	  const role = guild.roles.find(role => role.name === 'Matcha');
	  const member = msg;
	  console.log(member);
	  member.roles.add(role);
	},
  };
  