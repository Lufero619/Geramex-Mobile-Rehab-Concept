const form = document.getElementById(questionForm)
const validators = {
    fullname: value => value.trim().split(" ").length >= 2 || "Please enter your full name (first and last)."
    email : value => /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i.test(value) || "Please enter a valid email address."
    phone : value => /^[0-9]{7,15}$/.test(value) || "Phone must be 7-15 digits."
    receiveBy : value => value !== "" || "Please select how you want to receive."
    question : value => value.trim() !== "Please enter your question."
};
function validateField(id) {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(id + Error);
    const value = input.value;

    const valid = validators[id] ? validators[id](value) : true;

    if (valid !== true) {
        errorEl.textContent = valid;
        input.classList.add("invalid");
        return false
    }
    else{
        errorEl.textContent = "";
        input.classList.remove("invalid");
        return true
    }
}

Object.keys(validators).forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("input", () => validateField(id))
    input.addEventListener("blur", () => validateField(id))
});
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let allValid = true
    Object.keys(validators).forEach(this.id => {
        const valid = validateField(this.id) ;
        if (!valid) allValid = false
    });
    if (allValid) {
        alert("Form submitted successfully");
    }
});

const testimonials = document.querySelector(".testimonial");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let index = 0;

function showTestimonial(i) {
    testimonials.forEach((t, idx) => {
        t.classList.remove("active");
        if (idx === i) {
            t.classList.add("active");
        }
    });
}
prevBtn.addEventListener("click", () => {
    index = (index - 1 + testimonials.length);
    showTestimonial(index);
});
setInterval(() => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
}, 6000); 
// const $window = $(window);
// const $body = $('body');

// class Slideshow {
// 	constructor (userOptions = {}) {
//     const defaultOptions = {
//       $el: $('.slideshow'),
//       showArrows: false,
//       showPagination: true,
//       duration: 10000,
//       autoplay: true
//     }
    
//     let options = Object.assign({}, defaultOptions, userOptions);
    
// 		this.$el = options.$el;
// 		this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
//     this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
//     this.showPagination = options.showPagination;
// 		this.currentSlide = 1;
// 		this.isAnimating = false;
// 		this.animationDuration = 1200;
// 		this.autoplaySpeed = options.duration;
// 		this.interval;
// 		this.$controls = this.$el.find('.js-slider-home-button');
//     this.autoplay = this.maxSlide > 1 ? options.autoplay : false;

// 		this.$el.on('click', '.js-slider-home-next', (event) => this.nextSlide());
// 		this.$el.on('click', '.js-slider-home-prev', (event) => this.prevSlide());
//     this.$el.on('click', '.js-pagination-item', event => {
//       if (!this.isAnimating) {
//         this.preventClick();
//   this.goToSlide(event.target.dataset.slide);
//       }
//     });

// 		this.init();
// 	}
  
//   init() {
//     this.goToSlide(1);
//     if (this.autoplay) {
//       this.startAutoplay();
//     }
    
//     if (this.showPagination) {
//       let paginationNumber = this.maxSlide;
//       let pagination = '<div class="pagination"><div class="container">';
      
//       for (let i = 0; i < this.maxSlide; i++) {
//         let item = `<span class="pagination__item js-pagination-item ${ i === 0 ? 'is-current' : ''}" data-slide=${i + 1}>${i + 1}</span>`;
//         pagination  = pagination + item;
//       }
      
//       pagination = pagination + '</div></div>';
      
//       this.$el.append(pagination);
//     }
//   }
  
//   preventClick() {
// 		this.isAnimating = true;
// 		this.$controls.prop('disabled', true);
// 		clearInterval(this.interval);

// 		setTimeout(() => {
// 			this.isAnimating = false;
// 			this.$controls.prop('disabled', false);
//       if (this.autoplay) {
// 			  this.startAutoplay();
//       }
// 		}, this.animationDuration);
// 	}

// 	goToSlide(index) {    
//     this.currentSlide = parseInt(index);
    
//     if (this.currentSlide > this.maxSlide) {
//       this.currentSlide = 1;
//     }
    
//     if (this.currentSlide === 0) {
//       this.currentSlide = this.maxSlide;
//     }
    
//     const newCurrent = this.$el.find('.js-slider-home-slide[data-slide="'+ this.currentSlide +'"]');
//     const newPrev = this.currentSlide === 1 ? this.$el.find('.js-slider-home-slide').last() : newCurrent.prev('.js-slider-home-slide');
//     const newNext = this.currentSlide === this.maxSlide ? this.$el.find('.js-slider-home-slide').first() : newCurrent.next('.js-slider-home-slide');
    
//     this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
//     this.$el.find('.js-pagination-item').removeClass('is-current');
    
// 		if (this.maxSlide > 1) {
//       newPrev.addClass('is-prev');
//       newNext.addClass('is-next');
//     }
    
//     newCurrent.addClass('is-current');
//     this.$el.find('.js-pagination-item[data-slide="'+this.currentSlide+'"]').addClass('is-current');
//   }
  
//   nextSlide() {
//     this.preventClick();
//     this.goToSlide(this.currentSlide + 1);
// 	}
   
// 	prevSlide() {
//     this.preventClick();
//     this.goToSlide(this.currentSlide - 1);
// 	}

// 	startAutoplay() {
// 		this.interval = setInterval(() => {
// 			if (!this.isAnimating) {
// 				this.nextSlide();
// 			}
// 		}, this.autoplaySpeed);
// 	}

// 	destroy() {
// 		this.$el.off();
// 	}
// }

// (function() {
// 	let loaded = false;
// 	let maxLoad = 3000;  
  
// 	function load() {
// 		const options = {
//       showPagination: true
//     };

//     let slideShow = new Slideshow(options);
// 	}
  
// 	function addLoadClass() {
// 		$body.addClass('is-loaded');

// 		setTimeout(function() {
// 			$body.addClass('is-animated');
// 		}, 600);
// 	}
  
// 	$window.on('load', function() {
// 		if(!loaded) {
// 			loaded = true;
// 			load();
// 		}
// 	});
  
// 	setTimeout(function() {
// 		if(!loaded) {
// 			loaded = true;
// 			load();
// 		}
// 	}, maxLoad);

// 	addLoadClass();
// })();
