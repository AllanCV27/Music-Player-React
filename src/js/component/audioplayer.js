import React, { useState, useEffect, useRef } from "react";
export function AudioPlayer() {
	const [fetchData, setFetchData] = useState(null);
	const [currentSong, setCurrentSong] = useState(0);
	const [paused, setPaused] = useState(true);
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => {
				setFetchData(data);
			});
	}, []);

	const audioRef = useRef();

	function audioPlay() {
		audioRef.current.play();
	}
	function audioPause() {
		audioRef.current.pause();
	}
	function chanceSond() {
		audioRef.current.src =
			"https://assets.breatheco.de/apis/sound/" +
			fetchData[currentSong + 1].url;

		audioRef.current.oncanplaythrough = () => {
			audioPlay();
		};

		setCurrentSong(currentSong + 1);
	}
	function afterSond() {
		audioRef.current.src =
			"https://assets.breatheco.de/apis/sound/" +
			fetchData[currentSong - 1].url;

		audioRef.current.oncanplaythrough = () => {
			audioPlay();
		};

		setCurrentSong(currentSong - 1);
	}
	function actualSong(i) {
		return () => {
			audioRef.current.src =
				"https://assets.breatheco.de/apis/sound/" + fetchData[i].url;

			audioRef.current.oncanplaythrough = () => {
				audioPlay();
			};
		};
	}

	return (
		<div className="container-principal">
			<div className="conte image-box w-50 p-3 ">
				<div>
					<audio
						ref={audioRef}
						src={
							"https://assets.breatheco.de/apis/sound/" +
							(fetchData == null
								? null
								: fetchData[currentSong].url)
						}
						type="audio/mpeg"></audio>
					{fetchData == null ? null : (
						<ul>
							{fetchData.map((song, i) => {
								return (
									<div className="container" key={i}>
										<li>
											<button
												onClick={actualSong(i)}
												className=" nombres btn-lg btn-block text-left">
												<i
													className="fab fa-napster"
													id="gato"></i>
												{song.id + "-" + song.name}
											</button>
										</li>
									</div>
								);
							})}
						</ul>
					)}
				</div>
				<div className="controles btn-lg btn-block text-left fixed-bottom">
					<button onClick={afterSond} className="boton">
						<i className="fas fa-fast-backward"></i>
					</button>
					<button
						onClick={() => {
							if (paused) {
								audioPlay();
								setPaused(false);
							} else {
								audioPause();
								setPaused(true);
							}
						}}
						className="boton">
						{paused ? (
							<i className="far fa-play-circle"></i>
						) : (
							<i className="far fa-pause-circle"></i>
						)}
					</button>
					<button onClick={chanceSond} className="boton">
						<i className="fas fa-fast-forward"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
