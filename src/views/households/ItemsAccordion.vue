  <div id="accordion">
    <div class="card bg-warning text-white text-center mb-3" >
      <div class="card-header" id="headingOne">
        <h5 class="mb-0">
          <a data-toggle="collapse" data-parent="#accordion">
            {{ list.store_name }}
            <button type="button" class="btn btn-primary btn-shadow-sm float-right" data-toggle="modal" data-target="#createItemModal" v-on:click="setCurrentList(list)">
              Add Item
            </button>
          </a>
        </h5>
      </div>
      <div id="collapseOne" class="collapse show" role="tabpanel">
      </div>
    </div>
    <div v-for="item in list.items">
    <div class="card">
      <div class="card-header" id="headingTwo">
        <h5 class="mb-0">
          <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
            {{ item.name }}
            <button type="button" class="btn btn-primary btn-sm float-right" data-toggle="modal" data-target="#updateItemModal" v-on:click="setCurrentItem(item)">
              Edit Item
            </button>
          </a>
        </h5>
      </div>
      <div id="collapseTwo" class="collapse">
        <div class="card-body">
          <p>{{ item.need_by_date }}</p>
          <p>{{ item.coupon_url }}</p>
          <img :src="item.image_url">
        </div>
      </div>
    </div>
  </div>
</div>
