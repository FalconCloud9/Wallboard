

export class WsEventListener {
    constructor(url) {
        this.url = url;
    }
    setDepartment(departmentName) {
        this.departmentName = departmentName;
    }

    setUpListener() {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = () => {
            console.log("connected to server");
            this.ws.send(JSON.stringify({ key: this.departmentName }))
        }

        this.ws.onmessage = msg => {
            if (msg.data,msg.data == '"reload"') window.location.reload();
        }
    }
}
