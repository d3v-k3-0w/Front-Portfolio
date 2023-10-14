/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

const YouTubeEmbed = ({ embedId }) => {
	return (
		<div className="youtube-video">
			<iframe
				title="YouTube Video"
				width="100%"
				height="315"
				src={`https://www.youtube.com/embed/${embedId}`}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen></iframe>
		</div>
	);
};

export default YouTubeEmbed;
