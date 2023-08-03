import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import {
  setConnected,
  setConnection,
  connectState,
  disconnected,
} from './walletSlice';

export default function WalletButton() {
  const connected = useSelector(connectState);
  const dispatch = useDispatch();

  const connectWallet = useCallback(async (e) => {
    e.preventDefault();
    console.log('connectWallet')
    if (connected) {
      return;
    }

    if (!window.hasOwnProperty("solana")) {
      return;
    }
    if (!window.solana.isPhantom) {
      return;
    }

    const wallet = window.solana;
    console.log('wallet', wallet);

    wallet.on('connect', (address) => {
      console.log('wallet-connect', address);

      const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
      dispatch(setConnection(connection))

      setTimeout(() => {
        dispatch(setConnected(address.toString()))
        toast.success("Wallet Connected", {
          hideProgressBar: true,
        });
      }, 150);
    });

    wallet.on('disconnect', () => {
      console.log('wallet-disconnect');
      dispatch(disconnected())
    });

    await wallet.connect();
  }, [connected, dispatch]);

  return (
    <div>
      <button
        className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
        type="button"
        onClick={connectWallet}
      >
        { connected ? "Create" : "Connect Wallet" }
      </button>
      <ToastContainer position="top-center" hideProgressBar/>
    </div>
  );
}
