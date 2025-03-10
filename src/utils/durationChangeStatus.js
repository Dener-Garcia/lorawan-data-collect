const durationChangeStatus = (dtt_start, dtt_end) => {
    const timeChangeStatus = new Date(dtt_start) - new Date(dtt_end);
    const timeDuration = (timeChangeStatus / 60000).toFixed(1)
    return timeDuration
  }

  module.exports = durationChangeStatus