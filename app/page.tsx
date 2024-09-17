'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import SignatureCanvas from 'react-signature-canvas';

export default function Home() {
  const signCanvas = useRef<SignatureCanvas>(null);
  const [signatureImage, setSignatureImage] = useState('');

  const clearSignature = () => {
    signCanvas.current?.clear();
  };

  const saveSignature = () => {
    if (signCanvas.current?.isEmpty() || !signCanvas.current) return;

    const _signatureImage = signCanvas.current.toDataURL('image/png');
    console.log('test', signatureImage);
    setSignatureImage(_signatureImage);
  };

  const downloadSignaturePNG = () => {
    if (!signatureImage) return;

    const link = document.createElement('a');
    link.href = signatureImage;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-40">
      <h1 className="text-center text-5xl">Signature POC:</h1>

      <div className="my-24">
        <p>Signature:</p>
        <SignatureCanvas
          ref={signCanvas}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: 'border-2 border-black rounded p-2',
          }}
        />

        <div className="mt-8">
          <button
            onClick={clearSignature}
            className="p-2 bg-red-600 text-white mr-4 cursor-pointer rounded"
          >
            Supprimer
          </button>
          <button
            onClick={saveSignature}
            className="p-2 bg-blue-600 text-white cursor-pointer rounded"
          >
            Sauvegarder
          </button>
        </div>
      </div>

      {signatureImage && (
        <div className="mt-30">
          <p>Visualisation signature: </p>
          <Image
            src={signatureImage}
            width={250}
            height={250}
            alt="signature visualisation"
          />
          <button
            onClick={downloadSignaturePNG}
            className="p-2 bg-blue-600 text-white cursor-pointer rounded"
          >
            Télécharger en format PNG
          </button>
        </div>
      )}
    </div>
  );
}
