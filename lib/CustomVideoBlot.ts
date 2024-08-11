import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class CustomVideo extends BlockEmbed {
  static create(value: { url: string }) {
    let node = super.create() as HTMLElement;
    let wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper relative pb-[56.25%] h-0';

    let video = document.createElement('iframe');
    video.setAttribute('src', value.url);
    video.setAttribute('frameborder', '0');
    video.setAttribute('allowfullscreen', 'true');
    video.className = 'absolute top-0 left-0 w-full h-full';

    wrapper.appendChild(video);
    node.appendChild(wrapper);
    return node;
  }

  static value(node: HTMLElement) {
    let iframe = node.querySelector('iframe');
    return {
      url: iframe?.getAttribute('src') || ''
    };
  }
}

CustomVideo.blotName = 'customVideo';
CustomVideo.tagName = 'div';
CustomVideo.className = 'custom-video';

Quill.register(CustomVideo);

export default CustomVideo;
