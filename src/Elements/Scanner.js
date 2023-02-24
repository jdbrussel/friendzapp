
import { BarcodeScanner } from "react-barcode-qrcode-scanner";
import { TextResult } from "dynamsoft-javascript-barcode";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PopupModal } from "../Modals/Modals";
import { IconOutline, IconSolid } from "./Icon";

import useGlobals from "../Hooks/useGlobals";
import useAuth from "../Hooks/useAuth";


const Scanner = () => {

    const app = useGlobals();
    const auth = useAuth();

    const [isActive, setIsActive] = useState(true); //whether the camera is active
    const [initialized, setInitialized] = useState(true); //whether the camera is active
    const [isPause, setIsPause] = useState(false); //whether the video is paused
    const [runtimeSettings, setRuntimeSettings] = useState("{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}"); //use JSON template to decode QR codes only
    const onOpened = (cam: HTMLVideoElement, camLabel: string) => { // You can access the video element in the onOpened event
        console.log("opened");
    }

    const onClosed = () => {
    }

    const onDeviceListLoaded = (devices: MediaDeviceInfo[]) => {
    }

    const onScanned = (results: TextResult[]) => { // barcode results
        if (results[0]?.barcodeText) {
            alert(results[0].barcodeText);
        }
    }

    const onClicked = (result: TextResult) => { // when a barcode overlay is clicked
        alert(result.barcodeText);
    }

    const onInitialized = () => { // when the Barcode Reader is initialized
        setInitialized(true);
    }


    const modalName = "scanner";
    const modalType = "over";

    return (
        <PopupModal modalName={modalName} modalType={modalType} app={app}>
            <div className="flex flex-col h-full w-full items-start justify-between safe-bottom safe-left safe-right ">
                <div className="flex w-full min-h-[50px] items-end justify-between p-[var(--app-body-padding)] gap-[var(--app-body-padding)]">
                    <div className="flex-grow-0 min-w-[22%] text-left">
                        <Link className="text-blue-400 " onClick={() => { setIsActive(false); app.ModalClose(modalName) }}>Annuleren</Link>
                    </div>
                    <div className="flex-1 min-w-0 text-center">
                        <h2 className="truncate text-lg font-semibold">Scanner</h2>
                    </div>
                    <div className="flex-grow-0 min-w-[22%] text-right">
                        <Link className="text-blue-400 " onClick={() => setIsActive(!isActive)}>{!isActive ? 'Scanner aan' : 'Scanner Uit'}</Link>
                    </div>
                </div>
                <div className="flex-1 w-full flex flex-col items-center justify-start gap-5">
                    <section className="w-full h-full">
                        <BarcodeScanner
                            isActive={isActive}
                            isPause={isPause}
                            license="DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxNzA3NDc5LVRYbFhaV0pRY205cVgyUmljZyIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAxNzA3NDc5IiwiY2hlY2tDb2RlIjotMTYwNjgxMjIwNX0="
                            drawOverlay={true}
                            desiredCamera="environment"
                            desiredResolution={{
                                width: 1280,
                                height: 720
                            }}
                            runtimeSettings={runtimeSettings}
                            onScanned={onScanned}
                            onClicked={onClicked}
                            onOpened={onOpened}
                            onClosed={onClosed}
                            onInitialized={onInitialized}
                            onDeviceListLoaded={onDeviceListLoaded}
                        >
                        </BarcodeScanner>
                    </section>
                </div>
                <div className="flex flex-row min-h-[30px] w-full px-[var(--app-body-padding)] items-center justify-center py-[var(--app-body-padding)]">
                    <span>Footer</span>
                </div>
            </div>
        </PopupModal>
    )
}

export default Scanner;