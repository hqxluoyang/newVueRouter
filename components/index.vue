

<script>
import userHcomp from './user/Hcomp.vue'
import image from './image/index.vue'
export default {
	getComp () {
		//console.log("image:" , image , userHcomp)
		return {
			userHcomp,
			image
		}
	}
}
</script>