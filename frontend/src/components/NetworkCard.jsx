export default function NetworkCard({

  upload,
  download,
  uploadSpeed,
  downloadSpeed

}) {

  const formatSpeed = (speed) => {

    if(speed > 1024){
      return `${(speed/1024).toFixed(1)} MB/s`
    }

    return `${speed.toFixed(1)} KB/s`
  }

  return (

    <div className="glass network-card">

      <div className="network-header">

        <h2>🌐 Network Activity</h2>

        <span className="network-live">
          LIVE
        </span>

      </div>

      <div className="network-total">

        <div className="network-item">

          <span>↑ Uploaded</span>

          <strong>
            {upload} MB
          </strong>

        </div>

        <div className="network-item">

          <span>↓ Downloaded</span>

          <strong>
            {download} MB
          </strong>

        </div>

      </div>
{/*}
      <div className="network-divider"></div>

      <div className="network-speed">

        <div>

          <span>Upload Speed</span>

          <h3>
            {formatSpeed(uploadSpeed)}
          </h3>

        </div>

        <div>

          <span>Download Speed</span>

          <h3>
            {formatSpeed(downloadSpeed)}
          </h3>

        </div>

      </div> */}
       

    </div>
  )
}