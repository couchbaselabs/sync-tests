{
	"log": ["CRUD", "REST+"],
	"databases": {
		"test": {
			"server": "walrus:",
			"sync": `
function(doc){
	channel(doc.channels);
}`,
			"users": {
				"GUEST": {"disabled": false, "admin_channels": ["*"] }
			}
		}
	}
}
