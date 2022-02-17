import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
    public showUpdateVersion: boolean;
    public frontVersion: string;
    public serverVersion: string;
    public version: string;

    constructor() {//protected _parametroInternoService: ParametroInternoService
        this.showUpdateVersion = false;

        //this.frontVersion = environment.appVersion;

        // this._parametroInternoService.inicializar(
        //     ParametroInterno,
        //     ParametroInternoListarRespuesta,
        //     "ParametroInterno"
        // );
    }

    ngOnInit() {
        setTimeout(() => {
            this.version = sessionStorage.getItem('version');
            console.log("version", this.version);
        }, 5000);
        // this.checkServerVersion();

    }

    // actualizarVersion() {
    //     window.location.reload();
    // }

    // //https://medium.com/@aakashbumiya/auto-reload-for-clients-after-deploy-with-angular-7-production-build-bdc45be9b2bd
    // async checkServerVersion() {
    //     let frequency: number = 1000 * 60 * 5;

    //     let parametroInterno = (await this._parametroInternoService.getVersionAplicacion());

    //     if (parametroInterno) {
    //         this.serverVersion = parametroInterno.valor;

    //         this.showUpdateVersion = (this.serverVersion !== this.frontVersion);
    //     }

    //     setTimeout(() => {
    //         this.checkServerVersion();
    //     }, frequency);
    // }

}
