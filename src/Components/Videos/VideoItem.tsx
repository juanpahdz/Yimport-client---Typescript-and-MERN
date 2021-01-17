import React from "react";
import { Video } from "./video";
import ReactPlayer from "react-player";
import "./videoStyles.css";
import { useHistory } from "react-router-dom";
import * as videoService from "./videoService";
interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
  const history = useHistory();

  const handleDelete = async (id: string) => {
    videoService.deleteVideo(id);
    loadVideos();
  };

  return (
    <div className="col-md-4 mb-5">
      <div className="card card-body video-item">
        <div className="d-flex justify-content-between">
          <h1 onClick={() => history.push(`/update/${video._id}`)}>
            {video.title}
          </h1>
          <span 
          onClick={() => video._id && handleDelete(video._id)}
          className="text-danger">x</span>
        </div>
        <p>{video.description}</p>
        <div className="embed-responsive embed-responsive-16by9">
          <ReactPlayer url={video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
