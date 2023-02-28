import { useState, useEffect, useRef, useCallback, Measure } from "react";
import { Link, NavLink } from "react-router-dom";
import { PopupModal } from "../Modals/Modals";
import { IconOutline, IconSolid } from "./Icon";

import jsQR from "jsqr";
import useGlobals from "../Hooks/useGlobals";
import useAuth from "../Hooks/useAuth";


const getCamera = async () => {

    if (!navigator.mediaDevices) {
        throw new Error("mediaDevices API unavailable.");
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(d => (d.kind === "videoinput"));
    return cameras[0];

};

const constraints = {
    audio: false,
    video: {
        facingMode: "environment"
    }
}

const startScanner = async () => {

    const video = document.getElementById("video");

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    await video.play();
}

const stopScanner = async () => {
    const video = await document.getElementById("video");
    await video.srcObject?.getTracks().forEach(track => track.stop());
}

const Scanner = () => {

    const app = useGlobals();
    const auth = useAuth();

    const modalName = "scanner";
    const modalType = "over";

    const requestRef = useRef();
    const statusRef = useRef();

    const [status, setStatus] = useState(false);

    const [codeData, setCodeData] = useState(false);

    const toggleScanner = async (action) => {

        if (statusRef.current === 'idle') {
            return startScanning();

        }
        if (statusRef.current === 'scanning' || action === 'stop') {
            await stopScanning();
        }
    }

    const startScanning = async () => {
        await stopScanning();
        setCodeData(false);
        await startScanner();
        statusRef.current = 'scanning';
        setStatus(statusRef.current);
        requestRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(requestRef.current);
    }

    const stopScanning = async () => {
        await stopScanner();
        cancelAnimationFrame(requestRef.current);
        statusRef.current = 'idle';
        setStatus(statusRef.current);
    }

    useEffect(() => {
        if (!statusRef.current) {
            statusRef.current = 'idle';
            startScanning();
        }
    });

    const tick = time => {

        console.log(statusRef.current);

        if (statusRef.current !== 'idle') {

            const video = document.getElementById("video");
            if (video) {

                const videoTracks = video.srcObject.getVideoTracks();
                const videoTrackSettings = videoTracks[0].getSettings();

                const canvas = document.createElement("canvas");
                canvas.height = videoTrackSettings.height;
                canvas.width = videoTrackSettings.width;


                var imageData;
                var fetchCode = false;
                if (canvas.width && canvas.height) {
                    const canvasContext = canvas.getContext("2d", { willReadFrequently: true });
                    canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
                    imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
                    fetchCode = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
                }
                if (!fetchCode?.data) {
                    // console.log(time);
                    requestRef.current = requestAnimationFrame(tick);
                    return () => cancelAnimationFrame(requestRef.current);
                }
                else {
                    setCodeData(fetchCode.data);
                    toggleScanner('stop');
                }
            }
        }
    }

    //              drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
    //              drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
    //              drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
    //              drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

    // const drawLine = (begin, end, color) => {
    //     if (canvas) {
    //         canvas.beginPath();
    //         canvas.moveTo(begin.x, begin.y);
    //         canvas.lineTo(end.x, end.y);
    //         canvas.lineWidth = 4;
    //         canvas.strokeStyle = color;
    //         canvas.stroke();
    //     }
    // }

    return (
        <PopupModal modalName={modalName} modalType={modalType} app={app}>
            <div className="flex flex-col h-full w-full items-start justify-between safe-bottom safe-left safe-right ">
                <div className="flex w-full min-h-[50px] items-end justify-between p-[var(--app-body-padding)] gap-[var(--app-body-padding)]">
                    <div className="flex-grow-0 min-w-[22%] text-left">
                        <Link className="text-blue-400 " onClick={() => { stopScanning(); app.ModalClose(modalName) }}>Annuleren</Link>
                    </div>
                    <div className="flex-1 min-w-0 text-center">
                        <h2 className="truncate text-lg font-semibold">Scanner ({status})</h2>
                    </div>
                    <div className="flex-grow-0 min-w-[22%] text-right">
                        <Link className="text-blue-400 " onClick={() => { toggleScanner(); }}>{status === 'scanning' ? 'Stoppen' : 'Scannen'}</Link>
                    </div>
                </div>
                <div className="flex-1 w-full flex flex-col items-center justify-center gap-5">
                    <section className="w-full h-full">
                        <video autoPlay={true} id="video" muted={true} className="w-full h-full" />
                    </section>
                </div>
                <div className="flex flex-row min-h-[30px] w-full px-[var(--app-body-padding)] items-center justify-center py-[var(--app-body-padding)]">
                    <p className="font-bold text-center px-5">{codeData}</p>
                </div>
            </div>
        </PopupModal>
    )
}

export default Scanner;

