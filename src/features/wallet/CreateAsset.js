import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { PublicKey } from "@solana/web3.js";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import WalletButton from "features/wallet/WalletButton";
import { Creator, extendBorsh } from "utils/metaplex/metadata";
import mintNFT from "utils/mintNFT";
import Uploader from "./Uploader";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { connectState, getConnection } from "./walletSlice";

export default function CreateAsset() {
  const connection = useSelector(getConnection);
  const connected = useSelector(connectState);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [supply, setSupply] = useState(1);
  const [file, setFile] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [freeze, setFreeze] = useState("");

  //Mint NFT
  const create = useCallback(async () => {
    console.log("connection", connection);
    console.log("file", file);
    if (!file) {
      toast("Please upload file");
      return;
    }

    console.log("window.solana", window.solana);
    const wallet = window.solana;
    if (!connected || !wallet.publicKey) {
      console.log("Not connected");
      toast("Please connect your wallet");
      return;
    }

    setLoading(true);
    extendBorsh();

    let collection = null;
    if (collectionName) {
      collection = {
        name: collectionName,
        family: "Season 1",
      };
    }

    const metadata = {
      animation_url: undefined,
      creators: [
        new Creator({
          address: new PublicKey(
            "BfLqm23Ee3feXzWGoVkoXDq2ax6vs57WiUsJFjhUFsdU"
          ),
          verified: false,
          share: 1,
        }),
        new Creator({
          address: new PublicKey(wallet.publicKey.toString()),
          verified: true,
          share: 99,
        }),
      ],
      description: description || "",
      external_url: externalUrl,
      image: file.name,
      name: name || "",
      symbol: "",
      sellerFeeBasisPoints: 100, //this.royalties * 100,
      attributes: null, //getParsedAttributes(),
      collection,
      properties: {
        category: "image",
        files: [{ type: file.type, uri: file.name }],
      },
    };
    try {
      const { payperLink } = await mintNFT(
        connection,
        wallet,
        [file],
        metadata
      );
      if (payperLink) {
        // const win = window.open(payperLink, '_blank');
        // if (win != null) {
        //   win.focus();
        // }
      }
      console.log("success", payperLink);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }, [
    connected,
    connection,
    name,
    description,
    externalUrl,
    file,
    collectionName,
  ]);

  return (
    <>
      <Navbar transparent WalletButton={WalletButton} />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("assets/img/team-2-800x800.jpg").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-32">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Create new item
                  </h3>
                  <div className="w-1/2 mx-auto text-left">
                    <p className="font-bold">
                      Image, Video, Audio, or 3D Model
                    </p>
                    <div className="text-xs leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      File types: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
                      GLB, GLTF. Max size: 100 MB
                    </div>
                    <Uploader handleImageChange={({ file }) => setFile(file)} />

                    {/* <label className="btn btn-default">
                      <input type="file" onChange={e => setFiles(e.target.files)} />
                    </label> */}

                    <p className="font-bold mt-6">Name</p>
                    <Input
                      value={name}
                      placeholder={"Item Name"}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <p className="font-bold mt-6">External Link</p>
                    <div className="text-xs leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      ACKCS will include a link to this RUL on this item's
                      detail page, so that users can click to learn more about
                      it. You are welcome to link to you own webpage with more
                      details.
                    </div>
                    <Input
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      placeholder={"https://yoursite.io/item/123"}
                    />
                    <p className="font-bold mt-6">Description</p>
                    <div className="text-xs leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      The description will be included on the item's detail page
                      underneath its image. Markdown syntax is supported.
                    </div>
                    <Input
                      value={description}
                      placeholder={
                        "Provide a detailed description of your item"
                      }
                      multiLine={true}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="font-bold mt-6">Collection</p>
                    <div className="text-xs leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      This is the collection where your item will appear.
                    </div>
                    <Select onChange={(e) => setCollectionName(e)} />
                    <p className="font-bold mt-6">Supply</p>
                    <div className="text-xs leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      The number of copies that can be minted. No gas cost to
                      you! Quantities above one coming soon.
                    </div>
                    <Input
                      placeholder={"1"}
                      disabled
                      value={supply}
                      onChange={(e) => setSupply(e.target.value)}
                    />
                    <p className="font-bold mt-6">Freeze metadata</p>
                    <div className="text-xs leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      Freezing your metadata will allow you to permanently lock
                      and store all of this item's content in decentralized file
                      storage.
                    </div>
                    <Input
                      value={freeze}
                      onChange={(e) => setFreeze(e.target.value)}
                      placeholder={
                        "To freeze your metadata, you must create your item first.\n"
                      }
                      disabled
                    />
                  </div>
                  {/*<div className="mb-2 text-blueGray-600">*/}
                  {/*    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>*/}
                  {/*    University of Computer Science*/}
                  {/*</div>*/}
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <button
                        className="bg-lightBlue-300 text-white px-6 py-2 rounded-lg"
                        onClick={create}
                        disabled={loading}
                      >
                        {loading && <span>Creating...</span>}
                        {loading && (
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                        {!loading && <span>Create</span>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer position="top-center" />
      <Footer />
    </>
  );
}
