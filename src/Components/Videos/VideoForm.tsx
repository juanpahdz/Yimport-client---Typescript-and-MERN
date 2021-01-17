import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Video } from "./video";
import * as videoService from "./videoService";
import { toast } from "react-toastify";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
interface params {
  id: string;
}

const VideoForm = () => {
  const history = useHistory();
  const params = useParams<params>();

  const initialState = {
    title: "",
    description: "",
    url: "",
  };

  const [video, setVideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await videoService.createVideos(video);
      toast.success("new video addeed");
      setVideo(initialState);
    } else {
      await videoService.updateVideo(params.id, video);
      toast.success("Video was updated succesfully");
    }

    history.push("/");
  };


  const getVideo = async (id: string) => {
    const res = await videoService.getVideo(id);

    const { title, description, url } = res.data;
    setVideo({ title, description, url });
  };

  useEffect(() => {
    if (params.id) getVideo(params.id);
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Videos</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Write a title"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.title}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="url"
                  placeholder="https://youtube.eo..."
                  className="form-control"
                  value={video.url}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  cols={20}
                  rows={3}
                  className="form-control"
                  placeholder="write a Description"
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>

              {params.id ? (
                <button className="btn btn-info">Update Video</button>
              ) : (
                <button className="btn btn-primary">Create Video</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
